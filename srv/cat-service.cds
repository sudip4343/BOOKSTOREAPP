using {amazon as my} from '../db/data-model';

service AmazonWebServices {
    entity Books as projection on my.Books;
    entity Logs  as projection on my.Logs;

    @cds.persistence.skip    
    entity BookandAuthors {
        key book_id    : String;
            book_name  : String;
            AuthorName : String;
    }
}
