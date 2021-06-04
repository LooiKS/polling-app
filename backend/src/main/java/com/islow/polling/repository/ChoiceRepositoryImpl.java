//package com.islow.polling.repository;
//
//
//import com.islow.polling.models.Choice;
//import org.springframework.stereotype.Repository;
//
//import javax.persistence.EntityManager;
//import javax.persistence.PersistenceContext;
//import javax.persistence.criteria.CriteriaBuilder;
//import javax.persistence.criteria.CriteriaQuery;
//import javax.persistence.criteria.Root;
//import javax.transaction.Transactional;
//import java.util.List;
//import java.util.Optional;
//
//@Transactional
//@Repository
//public class ChoiceRepositoryImpl implements ChoiceRepository {
//
////    @PersistenceContext
////    private EntityManager em;
////
////    @Override
////    public List<Choice> findByPollIds(List<Long> pollId) {
////
////        CriteriaBuilder cb = em.getCriteriaBuilder();
////        CriteriaQuery<Choice> query = cb.createQuery(Choice.class); // Query
////        Root<Choice> root = query.from(Choice.class);
////        query.select(root);
////        query.where(root.get("pollId").in(pollId));
////
////        List<Choice> results = em.createQuery(query).getResultList();
////
////
////        return results;
////
////    }
//
//}
