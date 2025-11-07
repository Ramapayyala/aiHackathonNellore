const { getDB } = require('../config/db');

/**
 * Task Model - Example usage of MongoDB connection
 */
class TaskModel {
  /**
   * Get the tasks collection
   * @returns {Collection} MongoDB collection
   */
  static getCollection() {
    const db = getDB();
    return db.collection('tasks');
  }

  /**
   * Create a new task
   * @param {Object} taskData - Task data
   * @returns {Promise<Object>} Created task
   */
  static async create(taskData) {
    const collection = this.getCollection();
    const result = await collection.insertOne({
      ...taskData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    return result;
  }

  /**
   * Find all tasks
   * @param {Object} filter - Query filter
   * @returns {Promise<Array>} Array of tasks
   */
  static async findAll(filter = {}) {
    const collection = this.getCollection();
    return await collection.find(filter).toArray();
  }

  /**
   * Find a task by ID
   * @param {string} id - Task ID
   * @returns {Promise<Object|null>} Task or null
   */
  static async findById(id) {
    const collection = this.getCollection();
    const { ObjectId } = require('mongodb');
    return await collection.findOne({ _id: new ObjectId(id) });
  }

  /**
   * Update a task
   * @param {string} id - Task ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Update result
   */
  static async update(id, updateData) {
    const collection = this.getCollection();
    const { ObjectId } = require('mongodb');
    return await collection.updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData, 
          updatedAt: new Date() 
        } 
      }
    );
  }

  /**
   * Delete a task
   * @param {string} id - Task ID
   * @returns {Promise<Object>} Delete result
   */
  static async delete(id) {
    const collection = this.getCollection();
    const { ObjectId } = require('mongodb');
    return await collection.deleteOne({ _id: new ObjectId(id) });
  }
}

module.exports = TaskModel;

