class StudentsController < ApplicationController
    def index
        render json: { data: Student.all.as_json(include: :subjects) }, status: :ok
    end

    def show
        student_id = params[:id]
        begin
            student = Student.find(student_id)
            render json: { data: student }, status: :ok
        rescue => exception
            render json: { message: exception }, status: :not_found
        end
    end

    def create
        student_create_params = params.permit([:code, :name, :dob, :grade, :progress, subject_ids: []])
        puts student_create_params
        begin
            student = Student.create!(student_create_params)
            render json: { data: student.as_json(include: :subjects) }, status: :ok
        rescue => exception
            render json: { message: exception }, status: :internal_server_error
        end
    end

    def update
        student_id = params[:id]
        student_update_params = params.permit([:code, :name, :dob, :grade, :progress, subject_ids: []])
        begin
            student = Student.find(student_id)
            student.update!(student_update_params)
            render json: { data: student.as_json(include: :subjects) }, status: :ok
        rescue => exception
            render json: { message: exception }, status: :internal_server_error
        end
    end

    def destroy
        student_id = params[:id]
        begin
            student = Student.find(student_id)
            student.destroy!
            render json: { message: "Student deleted successfully" }, status: :ok
        rescue => exception
            render json: { message: exception }, status: :not_found
        end
    end
end
