package tim2.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import tim2.auth.model.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findAll();

    User findOneByUsername(String username);

    User findOneById(Long id);

    User findByEmail(String email);

}
