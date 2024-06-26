export type TLead = {
    id: number;
    name: string;
    responsible_user_id: number;
    created_by: number;
    created_at: Date;
    updated_at: Date;
    account_id: number;
    pipeline_id: number;
    status_id: number;
    updated_by: number;
    is_deleted: false;
    main_contact: any;
    group_id: number;
    company: any;
    closed_at: Date;
    closest_task_at: Date;
    tags: any;
    custom_fields: any;
    contacts: TLeadContact[];
    sale: number;
    loss_reason_id: number;
    pipeline: any;
    _links: any;
    // _embedded: any;
};

export type TLeadResponsibleUser = {
    id: string;
    name: string;
}

export type TLeadContact = {
    id: string;
    name: string;
    phone: string;
}