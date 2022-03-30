class AddSubjects < ActiveRecord::Migration[6.1]
  def change
    Subject.insert_all(
      [
        {
          name: "Math",
        },
        {
          name: "English",
        },
        {
          name: "Science",
        },
        {
          name: "History",
        }
      ]
    )
  end
end
