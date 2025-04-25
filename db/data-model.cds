namespace amazon;


entity Books{
    key book_id : String;
    book_name : String;
}

entity Logs{
    key id : String;
    log_message : String;
}