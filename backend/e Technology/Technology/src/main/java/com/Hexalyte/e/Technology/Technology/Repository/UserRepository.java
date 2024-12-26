package com.Hexalyte.e.Technology.Technology.Repository;

import com.Hexalyte.e.Technology.Technology.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
