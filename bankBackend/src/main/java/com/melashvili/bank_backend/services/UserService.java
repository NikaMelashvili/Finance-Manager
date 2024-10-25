package com.melashvili.bank_backend.services;

import com.melashvili.bank_backend.model.dto.response.UserResponseDTO;
import com.melashvili.bank_backend.model.entities.User;
import com.melashvili.bank_backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponseDTO getUser(Long id) {
        User user = userRepository.getReferenceById(id);

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setId(user.getId());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setPfp(user.getPfp());

        return userResponseDTO;
    }

    public UserResponseDTO getUserByEmail(String email) {
        User user = userRepository.findByEmail(email);

        UserResponseDTO userResponseDTO = new UserResponseDTO();

        userResponseDTO.setId(user.getId());
        userResponseDTO.setEmail(user.getEmail());
        userResponseDTO.setPfp(user.getPfp());

        return userResponseDTO;
    }
}
