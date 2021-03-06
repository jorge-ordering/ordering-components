import React from 'react'

import { BusinessBasicInformationUI } from '../../components/BusinessBasicInformationUI'
import { BusinessBasicInformation } from '../../../src/components/BusinessBasicInformation'
import { TestComponent } from '../../components/TestComponent'

export const BusinessBasicInformationExample = ({ ordering }) => {
  const props = {
    /**
     * Instace of Ordering Class
     * @see See (Ordering API SDK)[https://github.com/sergioaok/ordering-api-sdk]
     */
    ordering: ordering,
    /**
     * UI Component, this must be containt all graphic elements and use parent props
     */
    UIComponent: BusinessBasicInformationUI,
    /**
     * Contains business basic information
     */
    business: {},
    /**
     * Components types before business basic information
     * Array of type components, the parent props will pass to these components
     */
    beforeComponents: [TestComponent],
    /**
     * Components types after business basic information
     * Array of type components, the parent props will pass to these components
     */
    afterComponents: [TestComponent],
    /**
     * Elements before business basic information
     * Array of HTML/Components elements, these components will not get the parent props
     */
    beforeElements: [<p key>Test Element Before</p>],
    /**
     * Elements after business basic information
     * Array of HTML/Components elements, these components will not get the parent props
     */
    afterElements: [<p key>Test Element After</p>]
  }
  return <BusinessBasicInformation {...props} />
}
