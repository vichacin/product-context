/* eslint-disable no-console */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import type { FC } from 'react'
import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useProduct } from 'vtex.product-context'

const ProductContext: FC = () => {
  const {
    orderForm: { items },
  } = useOrderForm()
  const [added, setAdded] = useState(false)
  const productContextValue = useProduct()
  var currentProductId: any
  var productAdded: any

  if (productContextValue?.product?.items.length == 1) {
    currentProductId = productContextValue?.product?.productId
    // Verifico si tengo el item agregado en el carrito
    productAdded = items?.filter(
      (item: any) => item.productId == currentProductId
    )
    useEffect(() => {
      if (productAdded.length > 0) {
        setAdded(true)
      } else {
        setAdded(false)
      }
    }, [productAdded])
  } else {
    currentProductId = productContextValue?.selectedItem?.itemId
    productAdded = items?.filter((item: any) => item.id == currentProductId)
    useEffect(() => {
      if (productAdded.length > 0) {
        setAdded(true)
      } else {
        setAdded(false)
      }
    }, [productAdded])
  }

  const AddToCart = 'Agregar al carrito'
  const QuantitySelector = 'Sumar unidades'

  return (
    <div>
      <h3>Este es el productContext: </h3>
      Nombre: {productContextValue?.product?.productName} <br></br>
      productId: {productContextValue?.product?.productId} <br></br>
      LinkText: {productContextValue?.product?.linkText} <br></br>
      ItemId: {productContextValue?.product?.items[0].itemId} <br></br>
      ItemName: {productContextValue?.product?.items[0].name} <br></br>
      <h3>Esta es la acción a realizar: </h3>
      {added ? QuantitySelector : AddToCart}
    </div>
  )
}

export default ProductContext
