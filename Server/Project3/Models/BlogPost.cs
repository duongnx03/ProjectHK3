using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Project3.Models
{
    public class BlogPost
    {
        [Key]
        public int BlogPostId { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-Z0-9]*$", ErrorMessage = "Only alphanumeric characters are allowed.")]
        [MaxLength(200, ErrorMessage = "Title cannot exceed 200 characters.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Please provide the content of the blog post.")]
        [MaxLength(10000, ErrorMessage = "Title cannot exceed 10000 characters.")]
        public string Content { get; set; }

        [Required(ErrorMessage = "Please provide the author's name.")]
        public string Author { get; set; }

        public DateTime? DatePublished { get; set; } = DateTime.UtcNow;

        public string? ImageUrl { get; set; }

        [NotMapped]
        public IFormFile? UploadFile { get; set; }

    }
}

