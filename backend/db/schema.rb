# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_26_170159) do

  create_table "students", charset: "latin1", force: :cascade do |t|
    t.string "code", null: false
    t.string "name", null: false
    t.date "dob", null: false
    t.integer "grade", null: false
    t.integer "progress"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["code"], name: "index_students_on_code"
  end

  create_table "students_subjects", id: false, charset: "latin1", force: :cascade do |t|
    t.bigint "student_id", null: false
    t.bigint "subject_id", null: false
    t.index ["student_id"], name: "index_students_subjects_on_student_id"
    t.index ["subject_id"], name: "index_students_subjects_on_subject_id"
  end

  create_table "subjects", charset: "latin1", force: :cascade do |t|
    t.string "name", null: false
  end

end
