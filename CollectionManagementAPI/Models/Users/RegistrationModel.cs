﻿using System.ComponentModel.DataAnnotations;

namespace CollectionManagement.Models.Users
{
    public class RegistrationModel
    {
        public string Nickname { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

    }
}
