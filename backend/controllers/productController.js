import asyncHandler from 'express-async-handler';

import Product from '../models/productModel.js';

/**
 * @desc    Get All Products
 * @route   GET /api/products
 * @access  public
 */
const getProducts = asyncHandler(async (req,res) => {
    const products = await Product.find({});
    res.json(products);
});

/**
 * @desc    Get Single Product
 * @route   GET /api/products/:id
 * @access  public
 */
const getProductById =  asyncHandler(async(req,res) => {
    try{
        const product = await Product.findById(req.params.id);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({message:'Product not Found'});
        }
    } catch (error) {
        console.error(`${error}`.red.inverse);
        res.status(500).json({message:'Something went Wrong'});
    }
});

/**
 * @desc    Delete a Product
 * @route   DELETE /api/products/:id
 * @access  public/admin
 */
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product removed' });
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

/**
 * @desc    Create a Product
 * @route   POST /api/products
 * @access  public/admin 
 */
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Product',
        price: 0,
        user: req.user._id,
        image: '/image/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample Description',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

/**
 * @desc		Update a product
 * @route		PUT /api/products/:id
 * @access	public/admin
 */
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category,  countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

/**
 * @desc		Create New Review
 * @route		POST /api/products/:id/reviews
 * @access	private
 */
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        const alreadyReviewed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        );

        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Product Already Reviewed');
        }

        const review = {
            name: req.user.name,
            user: req.user._id,
            rating: +rating,
            comment,
        };

        product.reviews.push(review);
        product.numReviews = product.reviews.length;

        product.rating =
            product.reviews.reduce((acc, currVal) => currVal.rating + acc, 0) / 
            product.reviews.length;
        
        await product.save();
        res.status(201).json({ message: 'Review Added' });
    } else {
        res.status(404);
        throw new Error('Product Not Found');
    }
});

export { 
    getProducts , 
    getProductById , 
    deleteProduct ,
    createProduct ,
    updateProduct ,
    createProductReview ,
};