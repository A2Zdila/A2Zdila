// UserController.java
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserDetails(id));
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.createUser(userDTO));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.updateUser(id, userDTO));
    }
}

// UserService.java
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    public UserDTO getUserDetails(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        
        return new UserDTO(
            user.getId(),
            user.getUsername(),
            user.getEmail(),
            user.getBooks().size(),
            calculateReviewCount(user)
        );
    }

    public User createUser(UserDTO userDTO) {
        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        return userRepository.save(user);
    }

    public User updateUser(Long id, UserDTO userDTO) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        user.setUsername(userDTO.getUsername());
        user.setEmail(userDTO.getEmail());
        return userRepository.save(user);
    }

    private int calculateReviewCount(User user) {
        return user.getBooks().size(); // Simplified - extend based on your review system
    }
}

// UserDTO.java
@Data
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private String email;
    private int booksRead;
    private int reviewsWritten;
}
