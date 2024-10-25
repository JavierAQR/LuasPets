package com.backend.luaspets.User;

import jakarta.persistence.AttributeConverter;

public class RoleConverter implements AttributeConverter<Role, Integer>{
    
    @Override
    public Integer convertToDatabaseColumn(Role role){
        return role != null ? role.getValue() :null;
    }

    @Override
    public Role convertToEntityAttribute(Integer value){
        return value != null ? Role.fromValue(value) : null;
    }
}
