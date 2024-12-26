package com.Hexalyte.e.Technology.Technology.service;

import com.Hexalyte.e.Technology.Technology.Entity.Book;
import com.Hexalyte.e.Technology.Technology.Entity.Category;
import com.Hexalyte.e.Technology.Technology.Repository.BookRepository;
import com.Hexalyte.e.Technology.Technology.Repository.CategoryRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@Getter
@Setter
public class BookService {

    private static final Logger logger = LoggerFactory.getLogger(BookService.class);

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id).orElse(null);
    }

    @Transactional
    public Book createBook(Book book) {
        if (Objects.isNull(book)) {
            throw new IllegalArgumentException("Book cannot be null");
        }
        return bookRepository.save(book);
    }

    @Transactional
    public Book updateBook(Long id, Book bookDetails) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book == null) {
            throw new IllegalArgumentException("Book not found");
        }
        book.setTitle(bookDetails.getTitle());
        book.setAuthor(bookDetails.getAuthor());
        return bookRepository.save(book);
    }

    @Transactional
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Transactional
    public Book addBookToCategory(Long bookId, Long categoryId) {
        Book book = bookRepository.findById(bookId).orElse(null);
        Category category = categoryRepository.findById(categoryId).orElse(null);

        if (book == null) {
            throw new IllegalArgumentException("Book not found with id " + bookId);
        }
        if (category == null) {
            throw new IllegalArgumentException("Category not found with id: " + categoryId);
        }

        // Add category to book's categories
        if (book.getCategories().contains(category)) {
            throw new IllegalArgumentException("Book is already added to this category");
        }

        book.getCategories().add(category);
        return bookRepository.save(book);
    }

    @Transactional
    public void removeBookFromCategory(Long bookId, Long categoryId) {
        Book book = bookRepository.findById(bookId).orElse(null);
        Category category = categoryRepository.findById(categoryId).orElse(null);
        if (book == null) {
            throw new IllegalArgumentException("Book not found with id " + bookId);
        }
        if (category == null) {
            throw new IllegalArgumentException("Category not found with id " + categoryId);
        }
        book.getCategories().remove(category);
        bookRepository.save(book);
    }
}
