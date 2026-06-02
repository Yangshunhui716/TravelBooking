package com.nhom34.services;

import java.util.Map;
import com.nhom34.pojo.Admins;
import com.nhom34.pojo.Users;


public interface AdminService {
    Admins addAdmin(Map<String, String> info, Users u);
}
