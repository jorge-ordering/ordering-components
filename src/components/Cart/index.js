import React from 'react'
import PropTypes from 'prop-types'
import { useOrder } from '../../contexts/OrderContext'
import { useConfig } from '../../contexts/ConfigContext'

export const Cart = (props) => {
  const {
    UIComponent,
    handleEditProduct
  } = props

  /**
   * Order context manager
   */
  const [orderState, { updateProduct, removeProduct, clearCart }] = useOrder()

  /**
   * Config context manager
   */
  const [stateConfig] = useConfig()

  /**
   * Total product in cart
   */
  const totalBalance = stateConfig.order?.quantity || 0

  /**
   * Max total product in cart by config
   */
  const maxCartProductConfig = (stateConfig.configs.max_product_amount ? parseInt(stateConfig.configs.max_product_amount) : 100) - totalBalance

  /**
   * Calc balance by product id
   */
  const getProductMax = (product) => {
    const productMax = (product.inventoried ? product.stock : maxCartProductConfig)
    const max = product.quantity + productMax - product.balance
    return max < product.quantity ? product.quantity : max
  }

  /**
   * Calc balance by product id
   */
  const offsetDisabled = (product) => {
    const productMax = (product.inventoried ? product.stock : maxCartProductConfig)
    return productMax - (product.balance - product.quantity)
  }

  // /**
  //  * Clear all product of the cart
  //  */
  // const clearCart = (uuid) => {
  //   clearCart(uuid)
  //   // dispatchOrd⁄er({ type: ORDER_ACTIONS.CLEAR_PRODUCTS })
  // }

  // /**
  //  * Remove a product of the cart
  //  */
  // const removeProduct = (product) => {
  //   removeProduct(product)
  //   dispatchOrder({ type: ORDER_ACTIONS.REMOVE_PRODUCT, productCode })
  // }

  /**
   * Change product quantity of the cart
   */
  const changeQuantity = (product, quantity) => {
    if (quantity === 0) {
      removeProduct(product)
    } else {
      updateProduct({
        id: product.id,
        business_id: product.id,
        code: product.code,
        quantity: quantity
      })
    }
  }

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          carts={orderState.carts}
          orderState={orderState}
          clearCart={clearCart}
          removeProduct={removeProduct}
          changeQuantity={changeQuantity}
          getProductMax={getProductMax}
          offsetDisabled={offsetDisabled}
          handleEditProduct={handleEditProduct}
        />
      )}
    </>
  )
}

Cart.propTypes = {
  /**
   * UI Component, this must be containt all graphic elements and use parent props
   */
  UIComponent: PropTypes.elementType,
  /**
   * Function to edit product behavior
   */
  handleEditProduct: PropTypes.func
}

Cart.defaultProps = {
}
