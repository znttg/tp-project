class ClientsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_client, only: [:show, :update, :destroy]

  def index
    @clients = Client.all
    render json: @clients
  end

  def show
    render json: @client
  end

  def create
    @client = Client.new(client_params)
    if @client.save
      render json: @client, status: :created
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  def update
    if @client.update(client_params)
      render json: @client
    else
      render json: @client.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @client.destroy
    head :no_content
  end

  private

  def set_client
    @client = Client.find(params[:id])
  end

  def client_params
    params.require(:client).permit(:name, :relationship_start, :address_city, :address_postal_code, :address_street, :address_apt, :activity_type, :info_email)
  end
end
