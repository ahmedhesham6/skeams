class Student < ApplicationRecord
    enum progress: { excellent: 1, very_good: 2, good: 3, fair: 4, fail: 5 }
    
    has_and_belongs_to_many :subjects

    #Validations

    # Present
    validates :code, :name, :dob, :grade, presence: true
    # Unique
    validates :code, uniqueness: true
    # Length
    validates :code, length: { maximum: 10 }
    validates :name, length: { maximum: 50 }
    validates :subjects, length: { minimum: 1, message: "should have at least 1 subject" }
    # ENUM
    validates :progress, inclusion: { in: progresses.keys }
    # Custom
    validate :age_value
    validate :grade_value


    def age_value
        if dob.present? && (DateTime.now.year - dob.year) < 6
          errors.add(:dob, "Age can't be less than 6")
        end
    end

    def grade_value
        if grade.present? && (grade < 1 || grade > 12)
          errors.add(:grade, "must be between 1 and 12")
        end 
    end
end
