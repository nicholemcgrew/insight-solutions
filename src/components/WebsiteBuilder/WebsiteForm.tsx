// src/components/WebsiteBuilder/WebsiteForm.tsx

import { useForm, useFieldArray, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  InputAdornment,
} from "@mui/material";
import { Add, Delete, Facebook, Instagram, LinkedIn } from "@mui/icons-material";
import { useEffect } from "react";
import type { WebsiteConfig } from "../../types/WebsiteConfig";

interface WebsiteFormProps {
  initialValues?: Partial<WebsiteConfig>;
  onChange: (data: WebsiteConfig) => void;
  onSubmit: (data: WebsiteConfig) => void;
}

const defaultValues: WebsiteConfig = {
  businessName: "",
  tagline: "",
  about: "",
  contactEmail: "",
  colorScheme: {
    primary: "#1976d2",
    secondary: "#9c27b0",
    background: "#ffffff",
    text: "#000000",
  },
  services: [{ title: "", description: "" }],
};

export default function WebsiteForm({ initialValues, onChange, onSubmit }: WebsiteFormProps) {
  const { control, watch, register, setValue, handleSubmit, formState: { errors } } = useForm<WebsiteConfig>({
    defaultValues: { ...defaultValues, ...initialValues },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  // Live update preview on every change
  useEffect(() => {
    const subscription = watch((value) => {
      onChange(value as WebsiteConfig);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("heroImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const colorKeys: (keyof WebsiteConfig["colorScheme"])[] = ["primary", "secondary", "background", "text"];

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, mx: "auto", p: 3 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Build Your Professional Website
      </Typography>

      <Grid container spacing={3}>
        {/* Basic Info */}
        <Grid item xs={12}>
          <TextField
            label="Business Name *"
            fullWidth
            {...register("businessName", { required: "Required" })}
            error={!!errors.businessName}
            helperText={errors.businessName?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Tagline" fullWidth {...register("tagline")} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="About Your Business" fullWidth multiline minRows={4} {...register("about")} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            label="Contact Email *"
            fullWidth
            {...register("contactEmail", { required: "Required" })}
            error={!!errors.contactEmail}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField label="Phone" fullWidth {...register("phone")} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Address" fullWidth {...register("address")} />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" component="label">
            Upload Hero Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Grid>

        {/* Social Links */}
        <Grid item xs={12} md={4}>
          <TextField label="Facebook" fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><Facebook /></InputAdornment> }} {...register("facebook")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="Instagram" fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><Instagram /></InputAdornment> }} {...register("instagram")} />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField label="LinkedIn" fullWidth InputProps={{ startAdornment: <InputAdornment position="start"><LinkedIn /></InputAdornment> }} {...register("linkedin")} />
        </Grid>

        {/* Colors - NOW UPDATES IN REAL TIME */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Color Scheme</Typography>
          <Grid container spacing={3}>
            {colorKeys.map((key) => (
              <Grid item xs={6} sm={3} key={key}>
                <Typography variant="body2" gutterBottom>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Typography>
                {/* Color Picker */}
                <Controller
                  name={`colorScheme.${key}`}
                  control={control}
                  render={({ field }) => (
                    <input
                      type="color"
                      {...field}
                      style={{ width: "100%", height: 60, border: "none", borderRadius: 8, cursor: "pointer" }}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
                {/* Hex Input */}
                <TextField
                  size="small"
                  fullWidth
                  sx={{ mt: 1 }}
                  {...register(`colorScheme.${key}`)}
                  placeholder="#000000"
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Services */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>Services</Typography>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ border: "1px solid #ddd", borderRadius: 2, p: 3, mb: 3, position: "relative" }}>
              <TextField
                label="Service Title *"
                fullWidth
                sx={{ mb: 2 }}
                {...register(`services.${index}.title`, { required: "Required" })}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={2}
                {...register(`services.${index}.description`)}
              />
              <IconButton
                onClick={() => remove(index)}
                disabled={fields.length === 1}
                color="error"
                sx={{ position: "absolute", top: 8, right: 8 }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Button startIcon={<Add />} onClick={() => append({ title: "", description: "" })} variant="outlined">
            Add Service
          </Button>
        </Grid>

        {/* Submit CTA */}
        <Grid item xs={12}>
          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Button type="submit" variant="contained" size="large" color="primary" sx={{ px: 6, py: 2 }}>
              Generate & Publish Website
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}