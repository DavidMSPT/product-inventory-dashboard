import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "./ProductCard"
import type { Product } from "@store/types"

const mockProduct: Product = {
  id: "1",
  name: "Test Laptop",
  description: "A test product description",
  price: 999.99,
  category: "Electronics",
  stock: 15,
  imageUrl: "https://example.com/image.jpg",
}

describe("ProductCard", () => {
  it("should render product information correctly", () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText("Test Laptop")).toBeInTheDocument()
    expect(screen.getByText("A test product description")).toBeInTheDocument()
    expect(screen.getByText("€999.99")).toBeInTheDocument()
    expect(screen.getByText("In Stock")).toBeInTheDocument()
  })

  it('should display "Out of Stock" badge when stock is 0', () => {
    const outOfStockProduct = { ...mockProduct, stock: 0 }
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(<ProductCard product={outOfStockProduct} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText("Out of Stock")).toBeInTheDocument()
  })

  it('should display "Low Stock" badge when stock is between 1-10', () => {
    const lowStockProduct = { ...mockProduct, stock: 5 }
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(<ProductCard product={lowStockProduct} onEdit={onEdit} onDelete={onDelete} />)

    expect(screen.getByText("Low Stock")).toBeInTheDocument()
  })

  it("should call onEdit with product when Edit button is clicked", async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />)

    const editButton = screen.getByRole("button", { name: /edit/i })
    await user.click(editButton)

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onEdit).toHaveBeenCalledWith(mockProduct)
  })

  it("should call onDelete with product when Delete button is clicked", async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />)

    const deleteButton = screen.getByRole("button", { name: /delete/i })
    await user.click(deleteButton)

    expect(onDelete).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledWith(mockProduct)
  })

  it("should render image with correct src and alt", () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()

    render(<ProductCard product={mockProduct} onEdit={onEdit} onDelete={onDelete} />)

    const image = screen.getByAltText("Test Laptop")
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg")
  })
})
