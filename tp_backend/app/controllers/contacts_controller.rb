# app/controllers/contacts_controller.rb

class ContactsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_client
  before_action :set_contact, only: [:update, :destroy]

  def index
    @contacts = @client.contacts
    render json: @contacts
  end

  def create
    @contact = @client.contacts.build(contact_params)
    if @contact.save
      render json: @contact, status: :created
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render json: @contact.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @contact.destroy
    head :no_content
  end

  private

  def set_client
    @client = Client.find(params[:client_id])
  end

  def set_contact
    @contact = @client.contacts.find(params[:id])
  end

  def contact_params
    params.require(:contact).permit(:name, :first_name, :email, :tel, :ext)
  end
end
