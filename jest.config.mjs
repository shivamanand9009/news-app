export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['@swc/jest', {
      jsc: {
        parser: {
          jsx: true
        },
        transform: {
          react: {
            runtime: 'automatic'
          }
        }
      }
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass|less)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  extensionsToTreatAsEsm: ['.jsx'], // Add this line
};