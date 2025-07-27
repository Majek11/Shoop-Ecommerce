import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useGetProductsQuery } from '@/store/api/productsApi'
import ProductCard from '@/components/common/ProductCard'
import { Star } from 'lucide-react'

const HomePage = () => {
  const { data: newArrivals = [], isLoading } = useGetProductsQuery({ limit: 4 })
  const { data: topSelling = [] } = useGetProductsQuery({ limit: 4 })

  const brands = [
    'VERSACE', 'ZARA', 'GUCCI', 'PRADA', 'Calvin Klein'
  ]

  const testimonials = [
    {
      name: 'Sarah M.',
      rating: 5,
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
      name: 'Alex K.',
      rating: 5,
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."
    },
    {
      name: 'James L.',
      rating: 5,
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-gray-100 transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-integral font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">FIND CLOTHES</span>{' '}
                  <span className="block text-black xl:inline">THAT MATCHES</span>{' '}
                  <span className="block text-black xl:inline">YOUR STYLE</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link to="/shop">
                      <Button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-black hover:bg-gray-800 md:py-4 md:text-lg md:px-10">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-3">
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-black">200+</div>
                    <div className="text-sm text-gray-500">International Brands</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-black">2,000+</div>
                    <div className="text-sm text-gray-500">High-Quality Products</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-black">30,000+</div>
                    <div className="text-sm text-gray-500">Happy Customers</div>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/hero-image.png"
            alt="Fashion models wearing stylish clothing"
          />
        </div>
      </section>

      {/* Brand Logos */}
      <section className="bg-black py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center space-x-8 md:space-x-12 flex-wrap">
            {brands.map((brand) => (
              <div key={brand} className="text-white text-xl md:text-2xl font-bold">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-integral font-bold text-center text-black mb-12">NEW ARRIVALS</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/shop">
              <Button variant="outline" className="px-8 py-3 rounded-full border-gray-300">
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-gray-200" />

      {/* Top Selling */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-integral font-bold text-center text-black mb-12">TOP SELLING</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {topSelling.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/shop">
              <Button variant="outline" className="px-8 py-3 rounded-full border-gray-300">
                View All
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Dress Style */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-integral font-bold text-center text-black mb-12">BROWSE BY DRESS STYLE</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Casual - Top Left */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              <img 
                src="/casual-style.jpg" 
                alt="Casual Style" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <h3 className="text-2xl font-bold text-black bg-white bg-opacity-90 px-3 py-1 rounded">Casual</h3>
              </div>
            </div>
            
            {/* Formal - Top Right */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              <img 
                src="/formal-style.jpg" 
                alt="Formal Style" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <h3 className="text-2xl font-bold text-black bg-white bg-opacity-90 px-3 py-1 rounded">Formal</h3>
              </div>
            </div>
            
            {/* Party - Bottom Left */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              <img 
                src="/party-style.jpg" 
                alt="Party Style" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <h3 className="text-2xl font-bold text-black bg-white bg-opacity-90 px-3 py-1 rounded">Party</h3>
              </div>
            </div>
            
            {/* Gym - Bottom Right */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
              <img 
                src="/gym-style.jpg" 
                alt="Gym Style" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-4 left-4">
                <h3 className="text-2xl font-bold text-black bg-white bg-opacity-90 px-3 py-1 rounded">Gym</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-integral font-bold text-center text-black mb-12">OUR HAPPY CUSTOMERS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h4 className="font-semibold text-black mb-2">{testimonial.name}</h4>
                <p className="text-gray-600 text-sm">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

