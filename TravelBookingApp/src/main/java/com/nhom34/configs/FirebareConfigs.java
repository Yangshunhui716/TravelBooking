package com.nhom34.configs;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import java.io.IOException;
import java.io.InputStream;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class FirebareConfigs {
    
    @Bean
    public FirebaseApp init() throws IOException{
        InputStream serviceAccount = getClass().getClassLoader().getResourceAsStream("ahtravelbookingweb-firebase-adminsdk-fbsvc-c3022223fd.json");
        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        return FirebaseApp.initializeApp(options);
    }
    
}
