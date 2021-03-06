import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export const BusinessReviews = (props) => {
  const {
    ordering,
    businessId,
    reviews,
    UIComponent
  } = props

  /**
   * businessReviewsList, this must be contain a reviews, loading and error to send UIComponent
   */
  const [businessReviewsList, setBusinessReviewsList] = useState({ reviews: [], loading: true, error: null })

  /**
   * ReviewsList, this must be contain an original array of business reviews
   */
  const [reviewsList, setReviewsList] = useState(reviews)

  /**
   * Method to change filter value for business reviews
   * @param {Number} val
   */
  const onChangeOption = (val = null) => {
    const reviews = val
      ? reviewsList.filter(review => review.total >= val && review.total < val + 1)
      : reviewsList
    setBusinessReviewsList({
      ...businessReviewsList,
      loading: false,
      reviews
    })
  }

  /**
   * Method to get business from SDK
   */
  const getBusiness = async () => {
    try {
      const { content: { result } } = await ordering
        .businesses(businessId)
        .select(['reviews'])
        .get()

      const list = result?.reviews?.reviews
      list.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
      setReviewsList(list)
      setBusinessReviewsList({
        ...businessReviewsList,
        loading: false,
        reviews: list
      })
    } catch (error) {
      setBusinessReviewsList({
        ...businessReviewsList,
        loading: false,
        error
      })
    }
  }

  useEffect(() => {
    if (reviews) {
      reviews.length &&
      reviews.sort((a, b) => {
        return new Date(b.created_at) - new Date(a.created_at)
      })
      setBusinessReviewsList({
        ...businessReviewsList,
        loading: false,
        reviews
      })
    } else {
      getBusiness()
    }
  }, [])

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          reviewsList={businessReviewsList}
          handleClickOption={onChangeOption}
        />
      )}
    </>
  )
}

BusinessReviews.propTypes = {
  /**
   * Instace of Ordering Class
   * @see See (Ordering API SDK)[https://github.com/sergioaok/ordering-api-sdk]
   */
  ordering: PropTypes.object.isRequired,
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: PropTypes.elementType,
  /**
   * Reviews, this array must be containt all info about business reviews
   */
  reviews: PropTypes.arrayOf(PropTypes.object),
  /**
   * Id to get business from aPI
   */
  businessId: PropTypes.number,
  /**
   * Components types before business reviews
   * Array of type components, the parent props will pass to these components
   */
  beforeComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Components types after business reviews
   * Array of type components, the parent props will pass to these components
   */
  afterComponents: PropTypes.arrayOf(PropTypes.elementType),
  /**
   * Elements before business reviews
   * Array of HTML/Components elements, these components will not get the parent props
   */
  beforeElements: PropTypes.arrayOf(PropTypes.element),
  /**
   * Elements after business reviews
   * Array of HTML/Components elements, these components will not get the parent props
   */
  afterElements: PropTypes.arrayOf(PropTypes.element)
}

BusinessReviews.defaultProps = {
  reviews: [],
  beforeComponents: [],
  afterComponents: [],
  beforeElements: [],
  afterElements: []
}
