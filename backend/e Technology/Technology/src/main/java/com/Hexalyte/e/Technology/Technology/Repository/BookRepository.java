package com.Hexalyte.e.Technology.Technology.Repository;

import com.Hexalyte.e.Technology.Technology.Entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
