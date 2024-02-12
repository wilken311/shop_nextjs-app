export const ValidateProps = {
    user: {
        email: { type: 'string', minLength: 1, },
        password: { type: 'string', minLength: 8 },
        name: { type: 'string', minLength: 4, maxLength: 30 },
        createdAt: { type: 'string'  },
        updatedAt: { type: 'string' }
    },
    product:{
        name: { type: 'string', minLength: 1, },
        description:{ type: 'string', minLength: 1, },
        price: { type: 'string', minLength: 1, },
        createdAt: { type: 'string'  },
        updatedAt: { type: 'string' }
    }
}