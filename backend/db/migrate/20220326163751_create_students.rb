class CreateStudents < ActiveRecord::Migration[6.1]
  def change
    create_table :students do |t|
      t.string :code, null: false, unique: true
      t.string :name, null: false
      t.date :dob, null: false
      t.integer :grade, null: false
      t.integer :progress
      t.index :code
      t.timestamps
    end
  end
end
