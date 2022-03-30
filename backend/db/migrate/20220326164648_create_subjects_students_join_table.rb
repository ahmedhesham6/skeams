class CreateSubjectsStudentsJoinTable < ActiveRecord::Migration[6.1]
  def change
    create_join_table :students, :subjects do |t|
      t.index :student_id
      t.index :subject_id
    end
  end
end
