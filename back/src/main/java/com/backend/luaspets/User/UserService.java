package com.backend.luaspets.User;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    @Transactional
    public UserResponse updateUser (UserRequest userRequest){

        User user = User.builder()
        .id(userRequest.id)
        .fullName(userRequest.getFullName())
        .email(userRequest.getEmail())
        .address(userRequest.getAddress())
        .phoneNumber(userRequest.getPhoneNumber())
        .role(Role.USER)
        .build();

        userRepository.updateUser(user.id, user.fullName, user.email, user.address, user.phoneNumber);
        return new UserResponse("El usuario se registró satisfactoriamente");

    }

    public UserDTO getUser(Integer id){
        User user = userRepository.findById(id).orElse(null);

        if(user!=null)
        {
            UserDTO userDTO = UserDTO.builder()
            .id(user.id)
            .username(user.username)
            .fullName(user.fullName)
            .email(user.email)
            .address(user.address)
            .phoneNumber(user.phoneNumber)
            .build();
            return userDTO;
        }
        return null;
    }


}
