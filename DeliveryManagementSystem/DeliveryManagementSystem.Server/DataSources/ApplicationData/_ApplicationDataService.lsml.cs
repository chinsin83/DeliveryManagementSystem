using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.LightSwitch;
using Microsoft.LightSwitch.Security.Server;
namespace LightSwitchApplication
{
    public partial class ApplicationDataService
    {
        partial void Partners_Inserting(Partner entity)
        {
            entity.Name = entity.Name.ToUpper();
            entity.IdentityNumber = entity.IdentityNumber.ToUpper();
            entity.Address = entity.Address.ToUpper();
            entity.Nationality = entity.Nationality.ToUpper();

            if (entity.Race != null)
            {
                entity.Race = entity.Race.ToUpper();
            }
            if (entity.Religion != null)
            {
                entity.Religion = entity.Religion.ToUpper();
            }
            if (entity.MaritalStatus != null)
            {
                entity.MaritalStatus = entity.MaritalStatus.ToUpper();
            }
            if (entity.DrivingLicense != null)
            {
                entity.DrivingLicense = entity.DrivingLicense.ToUpper();
            }
            if (entity.NextOfKinName != null)
            {
                entity.NextOfKinName = entity.NextOfKinName.ToUpper();
            }
            if (entity.NextOfKinRelationship != null)
            {
                entity.NextOfKinRelationship = entity.NextOfKinRelationship.ToUpper();
            }
            if (entity.PartnerID != null)
            {
                entity.PartnerID = entity.PartnerID.ToUpper();
            }
            if (entity.DisplayName != null)
            {
                entity.DisplayName = entity.DisplayName.ToUpper();
            }

        }

        partial void Partners_Updating(Partner entity)
        {
            entity.Name = entity.Name.ToUpper();
            entity.IdentityNumber = entity.IdentityNumber.ToUpper();
            entity.Address = entity.Address.ToUpper();
            entity.Nationality = entity.Nationality.ToUpper();

            if (entity.Race != null)
            {
                entity.Race = entity.Race.ToUpper();
            }
            if (entity.Religion != null)
            {
                entity.Religion = entity.Religion.ToUpper();
            }
            if (entity.MaritalStatus != null)
            {
                entity.MaritalStatus = entity.MaritalStatus.ToUpper();
            }
            if (entity.DrivingLicense != null)
            {
                entity.DrivingLicense = entity.DrivingLicense.ToUpper();
            }
            if (entity.NextOfKinName != null)
            {
                entity.NextOfKinName = entity.NextOfKinName.ToUpper();
            }
            if (entity.NextOfKinRelationship != null)
            {
                entity.NextOfKinRelationship = entity.NextOfKinRelationship.ToUpper();
            }
            if (entity.PartnerID != null)
            {
                entity.PartnerID = entity.PartnerID.ToUpper();
            }
            if (entity.DisplayName != null)
            {
                entity.DisplayName = entity.DisplayName.ToUpper();
            }
        }

        partial void Customers_Inserting(Customer entity)
        {
            entity.Name = entity.Name.ToUpper();
            if(entity.Desgination != null)
            {
                entity.Desgination = entity.Desgination.ToUpper();
            }
            if (entity.CompanyName != null)
            {
                entity.CompanyName = entity.CompanyName.ToUpper();
            }
            if (entity.CompanyRegistrationNumber != null)
            {
                entity.CompanyRegistrationNumber = entity.CompanyRegistrationNumber.ToUpper();
            }
        }

        partial void Customers_Updating(Customer entity)
        {
            entity.Name = entity.Name.ToUpper();
            if (entity.Desgination != null)
            {
                entity.Desgination = entity.Desgination.ToUpper();
            }
            if (entity.CompanyName != null)
            {
                entity.CompanyName = entity.CompanyName.ToUpper();
            }
            if (entity.CompanyRegistrationNumber != null)
            {
                entity.CompanyRegistrationNumber = entity.CompanyRegistrationNumber.ToUpper();
            }
        }

        partial void Accounts_Inserting(Account entity)
        {
            entity.AccountName = entity.AccountName.ToUpper();
            entity.AccountCode = entity.AccountCode.ToUpper();
            entity.Address = entity.Address.ToUpper();
        }

        partial void Accounts_Updating(Account entity)
        {
            entity.AccountName = entity.AccountName.ToUpper();
            entity.AccountCode = entity.AccountCode.ToUpper();
            entity.Address = entity.Address.ToUpper();
        }

        partial void Orders_Inserting(Order entity)
        {
            if (entity.DeliveryCharge == null)
            {
                entity.DeliveryCharge = entity.Account.DeliveryCharge;
            }
        }

        partial void Orders_Updating(Order entity)
        {
            if (entity.DeliveryCharge == null)
            {
                entity.DeliveryCharge = entity.Account.DeliveryCharge;
            }
        }

        partial void OrdersByPartner_PreprocessQuery(ref IQueryable<Order> query)
        {
            query = query.Where(x => x.Partner.IdentityNumber == Application.User.Name);
        }

        partial void AccountsByUser_PreprocessQuery(ref IQueryable<Account> query)
        {
            query = query.Where(x => x.Customer.UserName == Application.User.Name);
        }

        partial void FileStores_Inserting(FileStore entity)
        {
            entity.FileMetaData.FileSize = ConvertBytesToMegabytes(entity.FileBinaryContent.LongCount()).ToString("0.00") + " MB";
        }
        private double ConvertBytesToMegabytes(long bytes)
        {
            return (bytes / 1024f) / 1024f;
        }
    }
}
