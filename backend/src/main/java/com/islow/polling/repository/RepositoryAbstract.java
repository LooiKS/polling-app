package com.islow.polling.repository;

import java.util.Optional;

public abstract class RepositoryAbstract<T> {

    public <S extends T> S save(S entity) {
        return null;
    }


    public <S extends T> Iterable<S> saveAll(Iterable<S> entities) {
        return null;
    }


    public Optional<T> findById(Long aLong) {
        return Optional.empty();
    }


    public boolean existsById(Long aLong) {
        return false;
    }


    public Iterable<T> findAll() {
        return null;
    }


    public Iterable<T> findAllById(Iterable<Long> longs) {
        return null;
    }


    public long count() {
        return 0;
    }


    public void deleteById(Long aLong) {

    }


    public void delete(T entity) {

    }


    public void deleteAllById(Iterable<? extends Long> longs) {

    }


    public void deleteAll(Iterable<? extends T> entities) {

    }


    public void deleteAll() {

    }
}
