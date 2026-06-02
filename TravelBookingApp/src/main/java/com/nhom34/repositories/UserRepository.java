package com.nhom34.repositories;

import com.nhom34.pojo.Users;
import java.util.List;
import java.util.Map;

public interface UserRepository {
    List<Users> getUser();
    Users getUserById(Long id);
    Users getUserByUserName(String username);
    void updateActive(Long id, boolean active);
    void updateLastLogin(String username);
    Users addUser(Users u);
    boolean authenticate(String username, String password);
    Users updateProfile(Map<String, String> params, Long id);
    void updateAvatar(Long id,String avatar);
}
