export class Rental {
    rental_id: Number;
    product_id: Number;
    from_date: Date;
    to_date: Date;
    id_proof: String;
    status: String;
    mode_of_payment: String;
    payment_status: String;
    created: Date;

    product_name: String;
    product_owner_fullname: String;
    requesting_user_fullname: String;
    total_amount: Number;
    is_past_date: Boolean;
}
