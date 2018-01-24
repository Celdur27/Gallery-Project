# GalleryApp

## BackEnd

Backend napisany został w .Net Framework 4.5. Aby połączenie z bazą danych, której plik backup został zawarty w pliku gallery.bak, należy ustawić odpowiednie parametry Connection String w plikach FolderController oraz PictureController. 

## FrontEnd

Aby aplikacja zadziałała należy z konsoli wywołać polecenie 
```sh
npm install
```
Dodatkowo wykorzystałem dwie kontrolki z KendoUI: Dialog oraz FileUpload. 

## Database

Bazę należy przywrócić na serwerze w wersji SQL Server 14.0.1000.169. Jeśli nie uda się przywrócić należy utworzyć nową. Model bazy danych został dodany w pliku database model.jpg. 
