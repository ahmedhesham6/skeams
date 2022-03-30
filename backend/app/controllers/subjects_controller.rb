class SubjectsController < ApplicationController
    def index
        render json: { data: Subject.all }, status: :ok
    end

    def show
        subject_id = params[:id]
        begin
            student = Subject.find(subject_id)
            render json: { data: student }, status: :ok
        rescue => exception
            render json: { message: exception }, status: :not_found
        end
    end
end
