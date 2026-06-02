package com.nhom34.repositories.impl;

import com.nhom34.pojo.Users;
import jakarta.persistence.Query;
import java.util.List;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.hibernate5.LocalSessionFactoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.nhom34.repositories.UserRepository;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Repository
@Transactional
public class UserRepositoryImpl implements UserRepository{
    @Autowired
    private LocalSessionFactoryBean factory; 
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    

    public UserRepositoryImpl() {
    }
    @Override
    public List<Users> getUser() {
        Session s = this.factory.getObject().getCurrentSession();
        Query q = s.createQuery("FROM Users", Users.class);
        return q.getResultList();
    }
    
    @Override
    public Users getUserById(Long id) {
       Session s = this.factory.getObject().getCurrentSession();
       return s.get(Users.class, id);
    }

    @Override
    public Users getUserByUserName(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Query query = s.createNamedQuery("Users.findByUsername", Users.class);
        query.setParameter("username", username);

        return (Users) query.getSingleResult();
    }
    
    @Override
    public void updateActive(Long id, boolean active) {
        Session s = this.factory.getObject().getCurrentSession();
        Users u = this.getUserById(id);
        if (u.getIsActive()!=active){
            u.setIsActive(active);
        }
        s.merge(u);
    }
    
    @Override
    public void updateLastLogin(String username) {
        Session s = this.factory.getObject().getCurrentSession();
        Users u = this.getUserByUserName(username);
        u.setLastLogin(Date.from(Instant.now()));
        s.merge(u);
    }
    
    @Override
    public Users addUser(Users u) {
        Session s = this.factory.getObject().getCurrentSession();
        s.persist(u);
        
        return u;
    }
    
    @Override
    public boolean authenticate(String username, String password) {
        Users u = this.getUserByUserName(username);

        return this.passwordEncoder.matches(password, u.getPassword());
    }

    @Override
    public Users updateProfile(Map<String, String> params, Long id) {
        Session s = this.factory.getObject().getCurrentSession();
        Users user = s.get(Users.class, id);
        if (params.containsKey("phone")) {
            user.setPhone(params.get("phone"));
        }
        if (params.containsKey("email")) {
            user.setEmail(params.get("email"));
        }
        user.setUpdatedAt(new Date());
        s.merge(user);
        return user;
    }
    
    @Override
    public void updateAvatar(Long id,String avatar) {
        Session s = this.factory.getObject().getCurrentSession();
        Users user;
        if (avatar!=null) {
            user = s.get(Users.class, id);
            user.setAvatar(avatar);
            user.setUpdatedAt(new Date());
            s.merge(user);
        }
    }
    
}
