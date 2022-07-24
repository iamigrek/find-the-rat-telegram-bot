const Stats = require('../models/Stats')

const store = async data => {
  try {
    return await Stats.create(data)
  } catch (error) {
    return error
  }
}

const update = async (input) => {
  try {
    return await Stats.findOneAndUpdate({
      username: input.username
    },{ $set:input })
  } catch (error) {
    return error
  }
}

module.exports = {
  store, update
}