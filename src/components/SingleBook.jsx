import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetchBookByIdQuery } from '../redux/features/books/booksApi'
import { getImageUrl } from '../utils/GetImageUrl'
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../redux/features/cart/cartSlice'
const SingleBook = () => {
  // this is for the adding the book into cart
  const dispatch = useDispatch()
  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
  }

  // this is use for the getting the id as prompt to send it backend to get singleBookItem
  const { id } = useParams()
  const { data, isLoading, isError } = useFetchBookByIdQuery(id)

  const book = data?.book || {}; // using this because only it's working 

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error on load book in...</div>


  return (
    <div className='max-w-lg shadow-md p-5'>
      <h1 className='text-2xl font-bold mb-6'>{book.title}</h1>

      <div className="">
        <div>
          <img
            src={`${getImageUrl(book.coverImage)}`}
            alt=""
            className="mb-8"
          />
        </div>

        <div className="mb-5">
          <p className="text-gray-700 mb-2"><strong>Author:</strong> {book.author || 'admin'}</p>
          <p className="text-gray-700 mb-4"><strong>Published: </strong> {new Date(book?.createdAt).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-4 capitalize"><strong>Category: </strong> {book.category}</p>
          <p className="text-gray-700"><strong>Description: </strong> {book?.description}</p>
        </div>
        <button className="btn-primary px-6 space-x-1 flex items-center gap-1" onClick={() => handleAddToCart(book)}>
          <FiShoppingCart className='' />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}

export default SingleBook
