import React from 'react'

import { MyOrdersCardUI } from '../../components/MyOrdersCardUI'
import { MyOrdersCard } from '../../../src/components/MyOrdersCard'
import { TestComponent } from '../../components/TestComponent'

export const MyOrdersCardExample = ({ ordering }) => {
  const props = {
    /**
     * Instace of Ordering Class
     * @see See (Ordering API SDK)[https://github.com/sergioaok/ordering-api-sdk]
     */
    ordering: ordering,
    /**
     * UI Component, this must be containt all graphic elements and use parent props
     */
    UIComponent: MyOrdersCardUI,
    /**
     * Flag to change order card type [active, past]
     */
    orderType: 'active',
    // orderType: 'previous',
    /**
     * array that must be containt order status
     */
    status: [0, 3, 4, 7, 8, 9],
    // status: [1, 2, 5, 6, 10, 11, 12],
    /**
     * This must be contain array of orders
     */
    orders: [],
    /**
     * Components types before my orders card
     * Array of type components, the parent props will pass to these components
     */
    beforeComponents: [TestComponent],
    /**
     * Components types after my orders card
     * Array of type components, the parent props will pass to these components
     */
    afterComponents: [TestComponent],
    /**
     * Elements before my orders card
     * Array of HTML/Components elements, these components will not get the parent props
     */
    beforeElements: [<p key>Test Element Before</p>],
    /**
     * Elements after my orders card
     * Array of HTML/Components elements, these components will not get the parent props
     */
    afterElements: [<p key>Test Element After</p>]
  }

  return <MyOrdersCard {...props} />
}
