#lang scheme
(module GEOMETRY mzscheme)
 
(define (shape w h)
  (cons w h))

(define (display-shape shape)
  (display (width shape))
  (display "x")
  (display (height shape)))

(define (width shape)
  (car shape))

(define (height shape)
  (cdr shape))

(define (area rect)
  (* (width rect)
     (height rect)))

(provide shape display-shape)

