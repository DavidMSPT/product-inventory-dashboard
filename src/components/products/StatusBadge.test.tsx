import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import StatusBadge from "./StatusBadge"

describe("StatusBadge", () => {
  it('should render "Out of Stock" with rose background when stock is 0', () => {
    const { container } = render(<StatusBadge stock={0} />)

    expect(screen.getByText("Out of Stock")).toBeInTheDocument()
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain("bg-rose-100")
  })

  it('should render "Low Stock" with amber background when stock is between 1-5', () => {
    const { container } = render(<StatusBadge stock={3} />)

    expect(screen.getByText("Low Stock")).toBeInTheDocument()
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain("bg-amber-100")
  })

  it('should render "In Stock" with green background when stock is greater than 5', () => {
    const { container } = render(<StatusBadge stock={50} />)

    expect(screen.getByText("In Stock")).toBeInTheDocument()
    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain("bg-green-100")
  })

  it("should have whitespace-nowrap class to prevent text wrapping", () => {
    const { container } = render(<StatusBadge stock={3} />)

    const badge = container.firstChild as HTMLElement
    expect(badge.className).toContain("whitespace-nowrap")
  })

  it("should handle edge case: stock = 1 as Low Stock", () => {
    render(<StatusBadge stock={1} />)
    expect(screen.getByText("Low Stock")).toBeInTheDocument()
  })

  it("should handle edge case: stock = 5 as Low Stock", () => {
    render(<StatusBadge stock={5} />)
    expect(screen.getByText("Low Stock")).toBeInTheDocument()
  })

  it("should handle edge case: stock = 6 as In Stock", () => {
    render(<StatusBadge stock={6} />)
    expect(screen.getByText("In Stock")).toBeInTheDocument()
  })
})
