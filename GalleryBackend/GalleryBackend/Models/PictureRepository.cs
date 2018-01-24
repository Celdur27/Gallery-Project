using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

namespace GalleryBackend.Models
{
    public class PictureRepository
    {
        private static string connectionString = "Data Source=MATEUSZ-KOMP;Initial Catalog=gallery;User id = Mateusz;Password=qwerty;";
        private static SqlConnection conn = new SqlConnection(connectionString);

        public static void connectToDatabase()
        {

        }

        public static List<PictureModel> GetAllPictures()
        {
            connectToDatabase();
            List<PictureModel> pictures = new List<PictureModel>();
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "SELECT * FROM [gallery].[dbo].[Picture]";
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    PictureModel picture = new PictureModel();

                    picture.id = dr["ID"].ToString();
                    picture.name = dr["Name"].ToString();
                    picture.description = dr["Description"].ToString();
                    picture.url = dr["Url"].ToString();
                    picture.folderID = dr["FolderID"].ToString();

                    pictures.Add(picture);
                    Console.WriteLine();
                }
            }

            conn.Close();
            return pictures;
        }

        public static PictureModel GetPicture(string id)
        {
            PictureModel picture = new PictureModel();
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "SELECT * FROM [gallery].[dbo].[Picture] WHERE id=" + id;
                System.Diagnostics.Debug.WriteLine("Zapytanie: " + query);
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    picture.id = dr["ID"].ToString();
                    picture.name = dr["Name"].ToString();
                    picture.description = dr["Description"].ToString();
                    picture.url = dr["Url"].ToString();
                    picture.folderID = dr["FolderID"].ToString();

                    Console.WriteLine();
                }
            }
            conn.Close();

            return picture;
        }

        public static void AddPicture(PictureModel picture)
        {
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "INSERT INTO [gallery].[dbo].[Picture] (Name, Description, Url, FolderID) VALUES ('" + picture.name + "', '" + picture.description + "', '" + picture.url + "', '" + picture.folderID + "')";
                System.Diagnostics.Debug.WriteLine("Zapytanie: " + query);
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
        }

        public static void DeletePicture(string id)
        {
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "DELETE FROM [gallery].[dbo].[Picture] WHERE id=" + id;
                System.Diagnostics.Debug.WriteLine("Zapytanie: " + query);
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
        }
    }
}