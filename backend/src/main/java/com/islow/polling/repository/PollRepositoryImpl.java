package com.islow.polling.repository;

import com.islow.polling.models.Poll;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

@Repository
public class PollRepositoryImpl implements PollRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Poll> findPolls(String username) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Poll> query = cb.createQuery(Poll.class);
        Root<Poll> root = query.from(Poll.class);

        Predicate[] predicates = new Predicate[1];
        predicates[0] = cb.equal(root.get("createdBy").get("username"), username);
        query.select(root).where(predicates).orderBy(cb.desc(root.get("createdDt")));

        List<Poll> results = em.createQuery(query).getResultList();
        if (results.isEmpty()) {
            return null;
        }
        return results;
    }
}
