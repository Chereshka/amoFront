<template>
    <div>
        <RestOutlined />
        <Card title="Wallhack2.0@gmail.com" :extra="inputComponent" :loading="loading">
            <Table :rowKey="rowKey" :data-source="leads" :columns="columns" :pagination="false"
                :onExpand="handleExpandedRowsChange" :expandedRowKeys="expandedRowKey"
                :expandedRowRender="expandedRowRender">
            </Table>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { Card, Input, Table, Tooltip } from 'ant-design-vue';

import { ref, onMounted, h } from 'vue';

import { fetchLeads } from '@/api';

import type { TLead } from '@/api/types';


const loading = ref(false);

const leads = ref<any[]>([])

const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: 'id',
    },
    {
        title: "Название",
        dataIndex: "name",
        key: 'name',
    },
    {
        title: "Бюджет",
        dataIndex: "price",
        key: 'price',
    },
    {
        title: "Статус",
        dataIndex: "status_id",
        key: 'status_id',
    },
    {
        title: "Ответственный",
        dataIndex: "responsible_user_name",
        key: "responsible_user_name",

        customRender: ({ text, record }: any) => {
            return h('div', { style: 'display: flex; align-items: center;' }, [
                h('i', { class: 'fas fa-user', style: 'margin-right: 8px;' }),
                h('span', {}, text)
            ]);
        }
    }
    ,
    {
        title: "Дата создания",
        dataIndex: "created_at",
        key: "created_at",
        customRender: ({ text }: any) => {
            const date = new Date(text * 1000);
            const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
            return h('span', {}, formattedDate);
        }
    }
];





const rowKey = "id"

const expandedRowKey = ref<number[]>([]);

let inputLength = ref<number>(0); // Initialize input length


const handleExpandedRowsChange = (close: boolean, record: TLead) => {
    close ?
        expandedRowKey.value.push(record.id)
        : expandedRowKey.value = expandedRowKey.value.filter(id => id !== record.id);

};

const expandedRowRender = (record: any) => {
    return h('div', {}, [
        h('ul', {}, record.record.contacts.map((contact: any) =>

            h('li', { style: 'list-style: none; ' }, [
                h('span', {}, contact.name),
                [
                    contact.phone && h('a', {
                        href: `tel:${contact.phone}`,
                        style: 'margin-left: 8px;'
                    }, [
                        h('i', {
                            class: 'fas fa-phone-alt',
                        })
                    ]),
                    contact.email && h('a', {
                        href: `mailto:${contact.email}`,
                        style: 'margin-left: 8px;'
                    }, [
                        h('i', {
                            class: 'fas fa-envelope',
                        })
                    ])
                ]
            ]),


        ))
    ]);
};

const loadLead = async (query?: string) => {

    if (query && query.length < 3) return;

    loading.value = true

    try {
        const res = await fetchLeads(query);
        leads.value = res.data;
    } catch (error) {
    }
    finally {
        loading.value = false
    }
};

const debounce = (fn: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, delay);
    };
};

const loadLeadDebounced = debounce(loadLead, 300);


const inputComponent = h(Input, {
    placeholder: "Найти... мин. 3 символа",
    style: "width: 200px;",

    onChange: async (e: any) => 
        loadLeadDebounced(e.target.value) 

});


onMounted(async () => {
    await loadLead();
});
</script>