using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.SqlClient;

namespace GalleryBackend.Models
{
    public class FolderRepository
    {
        private static string connectionString = "Data Source=MATEUSZ-KOMP;Initial Catalog=gallery;User id = Mateusz;Password=qwerty;";
        private static SqlConnection conn = new SqlConnection(connectionString);

        public static List<FolderModel> GetAllFolders()
        {
            List<FolderModel> folders = new List<FolderModel>();
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "SELECT * FROM [gallery].[dbo].[Folder]";
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    FolderModel folder = new FolderModel();

                    folder.id = dr["ID"].ToString();
                    folder.name = dr["Name"].ToString();
                    folder.description = dr["Description"].ToString();
                    folder.miniatureID = dr["MiniatureID"].ToString();

                    folders.Add(folder);
                    Console.WriteLine();
                }
            }
            conn.Close();
            return folders;
        }

        public static FolderModel GetFolder(string id)
        {
            FolderModel folder = new FolderModel();
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "SELECT * FROM [gallery].[dbo].[Folder] WHERE id=" + id;
                System.Diagnostics.Debug.WriteLine("Zapytanie: " + query);
                SqlCommand cmd = new SqlCommand(query, conn);
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    folder.id = dr["ID"].ToString();
                    folder.name = dr["Name"].ToString();
                    folder.description = dr["Description"].ToString();
                    folder.miniatureID = dr["MiniatureID"].ToString();

                    Console.WriteLine();
                }
            }
            conn.Close();

            return folder;
        }

        public static void AddFolder(FolderModel folder)
        {
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "INSERT INTO [gallery].[dbo].[Folder] (Name, Description, MiniatureID) VALUES ('" + folder.name + "', '" + folder.description + "', '" + folder.miniatureID + "')";
                System.Diagnostics.Debug.WriteLine("Zapytanie: " + query);
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
        }

        public static void EditFolder(FolderModel folder)
        {
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "UPDATE [gallery].[dbo].[Folder] SET Name = '" + folder.name + "', Description = '" + folder.description + "', MiniatureID = '" + folder.miniatureID + "' WHERE id=" + folder.id;
                System.Diagnostics.Debug.WriteLine("Zapytanie: " + query);
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
        }

        public static void DeleteFolder(string id)
        {
            conn.Open();

            if (conn.State == System.Data.ConnectionState.Open)
            {
                string query = "DELETE FROM [gallery].[dbo].[Folder] WHERE id=" + id;
                System.Diagnostics.Debug.WriteLine("Zapytanie: " + query);
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.ExecuteNonQuery();
            }
            conn.Close();
        }
    }
}