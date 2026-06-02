package com.nhom34.services;

import com.nhom34.pojo.Users;
import java.util.List;
import java.util.Map;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.multipart.MultipartFile;


public interface UserService extends UserDetailsService{
    List<Users> getUser();
    Users getUserById(Long id);
    Users getUserByUsername(String username);
    void updateActive(Long id, boolean active);
    void updateLastLogin(String username);
    Users addUser(Map<String, String> info, MultipartFile avatar);
    boolean authenticate(String username, String password);
    void updateAvatar(Long id, MultipartFile avatar);
}
