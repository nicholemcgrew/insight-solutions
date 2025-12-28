import { useForm, useFieldArray } from "react-hook-form"
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from "@mui/material"
import { Add, Delete } from "@mui/icons-material"
import type { WebsiteConfig } from "../../types/WebsiteConfig"
/**
 * Props for the WebsiteForm component.
 */
interface WebsiteFormProps {
  /**
   * Optional initial values for editing or pre-filling the form.
   */
  initialValues?: WebsiteConfig

  /**
   * Called when the form is submitted with valid data.
   */
  onSubmit: (data: WebsiteConfig) => void
}

/**
 * A reusable form for configuring a website.
 * 
 * This component is pure and stateless: it delegates
 * persistence and navigation to the parent via onSubmit.
 */
export default function WebsiteForm({ initialValues, onSubmit }: WebsiteFormProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<WebsiteConfig>({
    defaultValues: initialValues ?? {
      businessName: "",
      tagline: "",
      about: "",
      contactEmail: "",
      phone: "",
      heroImageUrl: "",
      colorScheme: {
        primary: "#1976d2", // MUI default primary
        secondary: "#9c27b0", // MUI default secondary
        background: "#ffffff",
      },
      services: [{ title: "", description: "" }],
    },
  })

  /**
   * Manages the dynamic list of services.
   */
  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  })

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 600 }}
    >
      <Typography variant="h5" mb={2}>
        Website setup
      </Typography>

      {/* Basic business info */}
      <TextField
        label="Business name"
        fullWidth
        margin="normal"
        {...register("businessName", { required: "Business name is required" })}
        error={!!errors.businessName}
        helperText={errors.businessName?.message}
      />

      <TextField
        label="Tagline"
        fullWidth
        margin="normal"
        {...register("tagline")}
      />

      <TextField
        label="About your business"
        fullWidth
        margin="normal"
        multiline
        minRows={3}
        {...register("about")}
      />

      {/* Contact details */}
      <TextField
        label="Contact email"
        fullWidth
        margin="normal"
        {...register("contactEmail", {
          required: "Contact email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Please enter a valid email address",
          },
        })}
        error={!!errors.contactEmail}
        helperText={errors.contactEmail?.message}
      />

      <TextField
        label="Phone"
        fullWidth
        margin="normal"
        {...register("phone")}
      />

      <TextField
        label="Hero image URL"
        fullWidth
        margin="normal"
        {...register("heroImageUrl")}
      />

      {/* Color configuration */}
      <Typography variant="h6" mt={3}>
        Colors
      </Typography>

      <Box display="flex" gap={2} mt={1}>
        <TextField
          label="Primary"
          type="color"
          sx={{ width: 120 }}
          {...register("colorScheme.primary")}
        />
        <TextField
          label="Secondary"
          type="color"
          sx={{ width: 120 }}
          {...register("colorScheme.secondary")}
        />
        <TextField
          label="Background"
          type="color"
          sx={{ width: 120 }}
          {...register("colorScheme.background")}
        />
      </Box>

      {/* Services list */}
      <Typography variant="h6" mt={3}>
        Services
      </Typography>

      {fields.map((field, index) => (
        <Box
          key={field.id}
          mt={2}
          p={2}
          border={1}
          borderRadius={1}
          borderColor="divider"
        >
          <TextField
            label="Service title"
            fullWidth
            margin="normal"
            {...register(`services.${index}.title` as const, {
              required: "Service title is required",
            })}
            error={!!errors.services?.[index]?.title}
            helperText={errors.services?.[index]?.title?.message}
          />

          <TextField
            label="Service description"
            fullWidth
            margin="normal"
            multiline
            minRows={2}
            {...register(`services.${index}.description` as const)}
          />

          <IconButton
            aria-label="Remove service"
            color="error"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
          >
            <Delete />
          </IconButton>
        </Box>
      ))}

      <Button
        startIcon={<Add />}
        onClick={() => append({ title: "", description: "" })}
        sx={{ mt: 2 }}
        type="button"
      >
        Add service
      </Button>

      {/* Submit */}
      <Box mt={4}>
        <Button type="submit" variant="contained">
          Generate website
        </Button>
      </Box>
    </Box>
  )
}
